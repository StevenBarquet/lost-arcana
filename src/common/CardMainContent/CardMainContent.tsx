// ---Dependencies
import React, { useEffect, useRef } from 'react'
// ---Styles
import style from './CardMainContent.module.scss'
import { motionComps } from 'src/utils/functions/motionUtils'
import { Fcol, Frow } from 'react-forge-grid'
import { ClickableTooltip } from 'src/common/ClickableTooltip/ClickableTooltip'
import { useAnimation, useInView, Variants } from 'framer-motion'

const { Div } = motionComps

interface Props {
  titulo: string | React.ReactNode
  tooltip?: string | React.ReactNode
  children: React.ReactNode
  contentTopSpace?: number
}

/**
 * CardMainContent Component: Card con estilos predefinidos para contener contenido principal de una pantalla, incluye animaciones de aparición para el card y el header.
 * @param {Props} props - Parámetros del componente como: ...
 */
export function CardMainContent({
  children,
  titulo,
  tooltip,
  contentTopSpace = 12,
}: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  const headerControls = useAnimation() // controla el shake
  const cardRef = useRef<HTMLDivElement>(null) // para detectar visibilidad

  const inView = useInView(cardRef, { once: true, amount: 0.35 })

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -4,
      boxShadow: '0 12px 24px rgba(0,0,0,.08)',
      transition: { duration: 0.25 },
    },
    tap: { scale: 0.97 },
  }

  const headerVariants: Variants = {
    initial: {},
    shake: {
      x: [0, -6, 6, -6, 6, 0], // keyframes
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  }

  useEffect(() => {
    if (!inView) return

    const t = setTimeout(() => {
      headerControls.start('shake')
    }, 1000) // 1 s tras aparecer la card

    return () => clearTimeout(t)
  }, [inView, headerControls])
  // -----------------------MAIN METHODS
  // -----------------------AUX METHODS
  // -----------------------RENDER
  return (
    <div className={style['CardMainContent']}>
      <Div
        ref={cardRef}
        className="mainCard"
        role="region"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible" // se lanza una sola vez
        viewport={{ once: true, amount: 0.35 }}
        whileHover="hover"
        whileFocus="hover" // accesible con tab
        // whileTap='tap'
      >
        <Div
          variants={headerVariants}
          initial="initial"
          animate={headerControls}
        >
          <Frow>
            <Fcol span={tooltip ? 90 : 100}>
              <h1>{titulo}</h1>
            </Fcol>
            {tooltip && (
              <Fcol span={10}>
                <ClickableTooltip content={tooltip} />
              </Fcol>
            )}
          </Frow>
        </Div>
        <Div style={{ marginTop: `${contentTopSpace}px` }}>{children}</Div>
      </Div>
    </div>
  )
}
