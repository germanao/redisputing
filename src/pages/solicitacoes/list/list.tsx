import React from 'react'
import { ISolic } from '../../../interfaces'
// import { ListDash, ListDashProps } from './ListDash.tsx'

type ListProps = {
  solics: ISolic[]
}

export const List: React.FC<ListProps> = ({ solics }) => {
  return (
    <>
      {solics.map((solic, index) => (
        <div key={index}>
          <p>Teste:{solic.id}</p>
        </div>
      ))}
    </>
  )
}
