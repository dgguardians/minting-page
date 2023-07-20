import React from 'react'
import Card from './Card'

function CardsContainer ({ images, names, ids }: any) {
  return (
    <div className='flex flex-wrap flex-row gap-5 w-5/6 md:w-full items-center justify-center'>
      <Card
        id={ids[0]}
        pricing={'0.02'}
        image={images[0]}
        name={names[0]}
        isConnected
        type='Legendary'
      />
      <Card
        id={ids[1]}
        pricing={'0.01'}
        image={images[1]}
        name={names[1]}
        isConnected
        type='Rare'
      />
      <Card
        id={ids[2]}
        pricing={'0.001'}
        image={images[2]}
        name={names[2]}
        isConnected
        type='Common'
      />
    </div>
  )
}

export { CardsContainer }
