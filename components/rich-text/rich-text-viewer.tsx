// components/rich-text/rich-text-viewer.tsx
"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface RichTextViewerProps {
  content: string
  className?: string
}

export function RichTextViewer({ content, className }: RichTextViewerProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-primary hover:underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'rounded-lg my-4',
        },
      }),
    ],
    content: content,
    editable: false,
    immediatelyRender: false, // ✅ FIX: Explicitly disable immediate render for SSR
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none focus:outline-none',
      },
    },
  })

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div className={cn('rich-text-content', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rich-text-content', className)}>
      <EditorContent editor={editor} />
    </div>
  )
}