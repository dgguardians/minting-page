import React from 'react'
import Card from './Card'

function CardsContainer ({ images, names, isConnected }: any) {
  return (
    <div className='flex flex-wrap flex-row gap-5 w-5/6 md:w-full items-center justify-center'>
      <Card pricing={100} image={images[0]} name={names[0]} isConnected type='Legendary' />
      <Card pricing={10} image={images[1]} name={names[1]} isConnected type='Rare' />
      <Card pricing={1} image={images[2]} name={names[2]} isConnected type='Common' />
    </div>
  )
}

export { CardsContainer }
