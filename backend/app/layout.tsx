import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pizza Inventory API Dashboard',
  description: 'Monitor your pizza inventory backend API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}