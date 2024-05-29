import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './'

const meta = {
  component: Tabs,
  // subcomponents: { TabsContent, TabsList, TabsTrigger },
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue={'my-cards'}>
      <TabsList>
        <TabsTrigger value={'my-cards'}>Account</TabsTrigger>
        <TabsTrigger value={'all-cards'}>Password</TabsTrigger>
      </TabsList>
      <TabsContent value={'my-cards'}>Table with my cards</TabsContent>
      <TabsContent value={'all-cards'}>Table with all cards</TabsContent>
    </Tabs>
  ),
}

export const TabsWithDisabledButton: Story = {
  render: () => (
    <Tabs defaultValue={'my-cards'}>
      <TabsList>
        <TabsTrigger value={'my-cards'}>Account</TabsTrigger>
        <TabsTrigger disabled value={'all-cards'}>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value={'my-cards'}>Table with my cards</TabsContent>
      <TabsContent value={'all-cards'}>Table with all cards</TabsContent>
    </Tabs>
  ),
}
