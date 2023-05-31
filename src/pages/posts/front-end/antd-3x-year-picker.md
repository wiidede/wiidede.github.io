---
title: Antd-3.x-YearPicker
date: 2022-04-15 15:09:27
id: antd-3x-year-picker
categories:
  - 前端
tags:
  - 前端
  - Antd
  - React
---

# Antd-3.x-YearPicker

> PS：React、TypeScript 初学，所以可能怪怪的

```tsx
/**
 * Custom yearPicker for antd 3.x datePicker does not have picker option
 */

import React, { FC, forwardRef, useState } from 'react'
import { DatePicker } from 'antd'

interface IYearPicker {
  placeholder: string
  format?: string
  size?: 'large' | 'small' | 'default'
  value?: any
  onChange?: (value) => void
}

const YearPicker: FC<IYearPicker> = (
  { placeholder, format, size, value, onChange = () => {} },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false)
  const handlePanelChange = (time) => {
    onChange(time)
    setIsOpen(false)
  }
  const handleOpenChange = (status) => {
    setIsOpen(status)
  }
  const clearValue = () => {
    onChange(null)
  }

  return (
    <DatePicker
      ref={ref}
      placeholder={placeholder}
      format={format}
      {...(size && { size })}
      {...(value && { value })}
      open={isOpen}
      mode="year"
      onOpenChange={handleOpenChange}
      onPanelChange={handlePanelChange}
      onChange={clearValue}
    />
  )
}

export default forwardRef(YearPicker)
```
