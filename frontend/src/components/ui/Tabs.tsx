import type { ReactNode } from 'react'

type Tab = {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

type TabsProps = {
  tabs: Tab[]
  activeTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

function Tabs({
  tabs,
  activeTab,
  onChange,
  className = '',
}: TabsProps) {
  const currentTab =
    tabs.find((tab) => tab.id === activeTab && !tab.disabled) ??
    tabs.find((tab) => !tab.disabled)

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-[#dce3ec]"
      >
        {tabs.map((tab) => {
          const isActive = currentTab?.id === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => {
                if (!tab.disabled) {
                  onChange?.(tab.id)
                }
              }}
              className={[
                'relative shrink-0 px-4 py-3',
                'text-sm font-semibold',
                'transition-colors duration-200',
                isActive
                  ? 'text-[#1769e0]'
                  : 'text-[#5e6b7d] hover:text-[#172033]',
                tab.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : '',
              ].join(' ')}
            >
              {tab.label}

              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1769e0]"
                />
              )}
            </button>
          )
        })}
      </div>

      {currentTab && (
        <div
          role="tabpanel"
          className="pt-6"
        >
          {currentTab.content}
        </div>
      )}
    </div>
  )
}

export default Tabs