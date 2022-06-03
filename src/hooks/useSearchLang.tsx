import axios from 'axios'
import tokenizer from 'chinese-tokenizer'
import { useEffect, useState } from 'react'
import { dipLangItems, LangItemType } from '../data/diplomatic_lang'
import { milLangItems } from '../data/military_lang'

export const useSearchLang = (inputTerm: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<{
    dipResults: LangItemType[],
    milResults: LangItemType[],
  }>()
  console.log('shit')

  useEffect(() => {
    setLoading(true)
    axios.get('/cedict_ts.u8').then((res) => {
      const tokenize = tokenizer.load(res.data)
      const tokenizedWords = tokenize(inputTerm)
      console.log(tokenizedWords)
      const tks = tokenizedWords.map((token: any) => {
        return token.text
      }).join('|')
      const re = new RegExp(tks, 'g')
      console.log(re)
      const dipFiltered = dipLangItems.filter((dItem: LangItemType) => {
        console.log(dItem)
        return dItem.officialLang.search(re) !== -1 || dItem.normalLang.search(re) !== -1
      })
      console.log('dipFilterd', dipFiltered)

      const milFiltered = milLangItems.filter((mItem: LangItemType) => {
        console.log(mItem)
        return mItem.officialLang.search(re) !== -1 || mItem.normalLang.search(re) !== -1
      })
      console.log('milFiltered', milFiltered)

      setSearchResult({
        dipResults: dipFiltered,
        milResults: milFiltered
      })
      setLoading(false)
    })
  }, [inputTerm])

  return { loading, searchResult }
}