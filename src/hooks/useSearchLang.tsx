import axios from 'axios'
import tokenizer from 'chinese-tokenizer'
import { useEffect, useState } from 'react'
import { dipLangItems, LangItemType } from '../data/diplomatic_lang'
import { milLangItems } from '../data/military_lang'

export const useSearchLang = (inputTerm?: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<{
    dipResults: LangItemType[],
    milResults: LangItemType[],
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

        const dipFiltered = dipLangItems.filter((dItem: LangItemType) => {
          return dItem.officialLang.search(re) !== -1 || dItem.normalLang.search(re) !== -1
        })

        const milFiltered = milLangItems.filter((mItem: LangItemType) => {
          return mItem.officialLang.search(re) !== -1 || mItem.normalLang.search(re) !== -1
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