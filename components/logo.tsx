import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* 盾牌背景 */}
          <path
            d="M20 4 L32 10 L32 22 C32 28.5 26.5 33 20 35 C13.5 33 8 28.5 8 22 L8 10 L20 4 Z"
            fill="url(#gradient2)"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
          />

          {/* 文字"检"的简化形状 */}
          <rect x="14" y="14" width="12" height="2" fill="white" rx="1" />
          <rect x="16" y="18" width="8" height="2" fill="white" rx="1" />
          <rect x="18" y="22" width="4" height="2" fill="white" rx="1" />

          {/* 检查标记 */}
          <path
            d="M15 26 L18 29 L25 22"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 渐变定义 */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
        敏感词检测API
      </span>
    </div>
  )
}