"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

interface ToasterProps {
  position?: 'top-right' | 'bottom-right'
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className={`fixed flex flex-col gap-2 w-full max-w-[420px] p-4 ${
        position === 'top-right' ? 'top-0 right-0' : 'bottom-0 right-0'
      }`} />
    </ToastProvider>
  )
}
