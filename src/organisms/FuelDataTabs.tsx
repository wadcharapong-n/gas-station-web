import { useId, useState } from 'react'
import type { FuelLevel, FuelPrice, FuelType } from '../lib/types'
import { useI18n } from '../lib/i18n/useI18n'
import { TabTrigger } from '../molecules/TabTrigger'
import { FuelAvailabilityPanel } from './FuelAvailabilityPanel'
import { FuelPriceBoard } from './FuelPriceBoard'

type FuelTab = 'prices' | 'levels'

export function FuelDataTabs({
  fuelTypes,
  prices,
  levels,
}: {
  fuelTypes: FuelType[]
  prices: FuelPrice[]
  levels: FuelLevel[]
}) {
  const { t } = useI18n()
  const baseId = useId()
  const [tab, setTab] = useState<FuelTab>('prices')

  const tabPricesId = `${baseId}-tab-prices`
  const tabLevelsId = `${baseId}-tab-levels`
  const panelPricesId = `${baseId}-panel-prices`
  const panelLevelsId = `${baseId}-panel-levels`

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-surface)]/80 shadow-sm ring-1 ring-white/5">
      <div
        role="tablist"
        aria-label={t('home.fuelTabs.listLabel')}
        className="flex gap-2 border-b border-white/10 bg-[var(--color-surface-muted)]/40 p-2 sm:p-3"
      >
        <TabTrigger
          id={tabPricesId}
          ariaControls={panelPricesId}
          selected={tab === 'prices'}
          onClick={() => setTab('prices')}
        >
          {t('home.prices.title')}
        </TabTrigger>
        <TabTrigger
          id={tabLevelsId}
          ariaControls={panelLevelsId}
          selected={tab === 'levels'}
          onClick={() => setTab('levels')}
        >
          {t('home.levels.title')}
        </TabTrigger>
      </div>

      <div className="p-6 sm:p-8">
        <div
          id={panelPricesId}
          role="tabpanel"
          aria-labelledby={tabPricesId}
          hidden={tab !== 'prices'}
        >
          <FuelPriceBoard embedded fuelTypes={fuelTypes} prices={prices} />
        </div>
        <div
          id={panelLevelsId}
          role="tabpanel"
          aria-labelledby={tabLevelsId}
          hidden={tab !== 'levels'}
        >
          <FuelAvailabilityPanel embedded fuelTypes={fuelTypes} levels={levels} />
        </div>
      </div>
    </div>
  )
}
