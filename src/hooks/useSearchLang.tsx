import { Box, Typography } from '@mui/material'
import axios from 'axios'
import tokenizer from 'chinese-tokenizer'
import React, { useEffect, useState } from 'react'
import { dipLangItems, LangItemType } from '../data/diplomatic_lang'
import { milLangItems } from '../data/military_lang'

export type SearchResultType = LangItemType & {
  officialLangElem: React.ReactNode
  normalLangElem: React.ReactNode
}

export const parseWithHighlight = (source: string, re: RegExp, prefix?: React.ReactNode, isBold?: boolean) => {
  const tempOfficialLang = source.replace(re, (match) => {
    return `<${match}>`
  })
  const fWeight = isBold ? 700 : 400
  return (
    <Box display={'flex'} alignItems='center' flexWrap={'wrap'} justifyContent='flex-start'>
      {prefix}
      {
        tempOfficialLang.split('<').map((subStr: string) => {
          if (subStr.indexOf('>') !== -1) {
            const ss = subStr.split('>')
            return (
              <>
                <Typography color='orange' fontWeight={fWeight}>{ss[0]}</Typography>
                <Typography fontWeight={fWeight}>{ss[1]}</Typography>
              </>
            )
          }
          return (
            <Typography fontWeight={fWeight}>{subStr}</Typography>
          )
        })
      }
    </Box>
  )
}

export const useSearchLang = (inputTerm?: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<{
    dipResults: SearchResultType[],
    milResults: SearchResultType[],
  }>()

  useEffect(() => {
    setLoading(true)
    if (inputTerm) {
      axios.get('/cedict_ts.u8').then((res: any) => {
        const tokenize = tokenizer.load(res.data)
        const tokenizedWords = tokenize(inputTerm)

        const tks = tokenizedWords.map((token: any) => {
          return token.text
        }).filter((t: string) => t.length > 1)
        const re = new RegExp([inputTerm, ...tks].join('|'), 'g')

        const dipFiltered: SearchResultType[] = dipLangItems.filter((dItem: LangItemType) => {
          return dItem.officialLang.search(re) !== -1 || dItem.normalLang.search(re) !== -1
        }).map((di: LangItemType) => {
          return {
            ...di,
            officialLangElem: parseWithHighlight(di.officialLang, re, <Typography marginRight={'8px'}>{`CCP: `}</Typography>, true),
            normalLangElem: parseWithHighlight(di.normalLang, re)
          }
        })

        const milFiltered: SearchResultType[] = milLangItems.filter((mItem: LangItemType) => {
          return mItem.officialLang.search(re) !== -1 || mItem.normalLang.search(re) !== -1
        }).map((mi: LangItemType) => {
          return {
            ...mi,
            officialLangElem: parseWithHighlight(mi.officialLang, re, <Typography marginRight={'8px'}>{`CCP: `}</Typography>, true),
            normalLangElem: parseWithHighlight(mi.normalLang, re)
          }
        })

        setSearchResult({
          dipResults: dipFiltered,
          milResults: milFiltered
        })
        setLoading(false)
      })
    } else {
      setSearchResult({
        dipResults: [],
        milResults: []
      })
      setLoading(false)
    }
  }, [inputTerm])

  return { loading, searchResult }
}