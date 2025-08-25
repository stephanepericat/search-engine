import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')

    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 })
    }

    // Validate domain format
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!domainRegex.test(domain)) {
      return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 })
    }

    // Try multiple favicon URLs
    const faviconUrls = [
      `https://www.${domain}/favicon.ico`,
      `https://${domain}/favicon.ico`,
      `https://www.${domain}/apple-touch-icon.png`,
      `https://${domain}/apple-touch-icon.png`,
    ]

    for (const faviconUrl of faviconUrls) {
      try {
        const response = await fetch(faviconUrl, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SearchEngine/1.0)',
          },
          redirect: 'follow',
        })

        if (response.ok) {
          // If favicon exists, redirect to it
          return NextResponse.redirect(faviconUrl)
        }
      } catch (error) {
        // Continue to next URL
        continue
      }
    }

    // If no favicon found, return a data URL for a default icon
    const defaultIcon = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#6B7280"/>
        <text x="8" y="11" text-anchor="middle" fill="white" font-size="10" font-family="Arial">🌐</text>
      </svg>
    `)}`

    return new NextResponse(defaultIcon, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    })
  } catch (error) {
    console.error('Favicon API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}