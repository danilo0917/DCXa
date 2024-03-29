import { Currency, ETHER, Token } from '@pancakeswap/sdk'
import { BinanceIcon } from '@pancakeswap/uikit'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <BinanceIcon width={size} style={style} />
  }

  if (currency?.symbol === 'AMA') {
    return <StyledLogo srcs={['/images/tokens/0xFC3dA4A1b6faDaB364039525dD2AB7c0c16521cd.png']} size={size} style={style} alt="Token Logo" />
  }

  // if (currency?.symbol === 'CHRONIC') {
  //   return <StyledLogo srcs={['/images/tokens/0x78a304f48ac7933663f32a054bbf3aa03c5a4e20.png']} size={size} style={style} alt="Token Logo" />
  // }

  // if (currency?.symbol === 'CGOLD') {
  //   return <StyledLogo srcs={['/images/tokens/0xd490E8eeB306558c764c806E1Ce159e7973eFaB2.png']} size={size} style={style} alt="Token Logo" />
  // }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
