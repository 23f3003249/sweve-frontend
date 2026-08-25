import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: 'Upcoming',
    value: 'Upcoming',
    content: (
      <>
      </>
    )
  },
  {
    name: 'Past',
    value: 'Past',
    content: (
      <>
      </>
    )
  },
  {
    name: 'Cancelled',
    value: 'Cancelled',
    content: (
      <>
      </>
    )
  }
]

const Tickettab = () => {
  return (
    <div className='w-full max-w-md'>
      <Tabs defaultValue='Upcoming' className='gap-4'>
        <TabsList variant='line' className='rounded-none border-b p-0'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='border-0 group-data-horizontal/tabs:after:-bottom-[0.5px]'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <p className='text-muted-foreground text-sm'>{tab.content}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Tickettab
