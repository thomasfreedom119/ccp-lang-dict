import { CircularProgress, Grid, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSearchLang } from "../../hooks/useSearchLang";

export const Search = () => {
  const [searchText, setSearchText] = useState<string>()
  const [inputText, setInputText] = useState<string>('')
  const { loading, searchResult } = useSearchLang(searchText)

  const onUserInput = (e: any) => {
    setInputText(e.target.value)
  }

  const onEnterPress = (e: any) => {
    if (e.key === 'Enter' && inputText.length > 0) {
      setSearchText(inputText)
    }
  }

  return (
    <>
      <Grid container direction='row' alignItems='center' marginBottom={'45px'} marginTop={'50px'}>
        <Input
          placeholder="Search CCP's languages"
          value={inputText}
          autoFocus
          onChange={onUserInput}
          fullWidth
          onKeyUp={onEnterPress}
        />
      </Grid>
      {
        loading ? <CircularProgress /> :
          <Grid container columns={2} spacing={2} justifyContent='space-between'>
            <Grid item>
              <Grid container direction='column' alignItems='flex-start'>
                <Grid item>
                  <Typography variant='h5'>Results in CCP's diplomatic language</Typography>
                </Grid>
                {
                  searchResult && searchResult.dipResults.length > 0 ?
                    searchResult.dipResults.map((dr, i: number) => {
                      return (
                        <Grid item margin={'15px'} key={i}>
                          {dr.officialLangElem}
                          {dr.normalLangElem}
                          {
                            dr.detail && <Typography fontWeight={300}>{dr.detail}</Typography>
                          }
                        </Grid>
                      )
                    }) :
                    <Grid item>
                      <Typography variant='body2'>No results found in CCP's diplomatic language</Typography>
                    </Grid>
                }
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='column' alignItems='flex-start'>
                <Grid item>
                  <Typography variant='h5'>Results in CCP's military language</Typography>
                </Grid>
                {
                  searchResult && searchResult.milResults.length > 0 ?
                    searchResult.milResults.map((mr, i: number) => {
                      return (
                        <Grid item margin={'15px'} key={i}>
                          {mr.officialLangElem}
                          {mr.normalLangElem}
                          {
                            mr.detail && <Typography fontWeight={300}>{mr.detail}</Typography>
                          }
                        </Grid>
                      )
                    }) :
                    <Grid item>
                      <Typography variant='body2'>No results found in CCP's military language</Typography>
                    </Grid>
                }
              </Grid>
            </Grid>
          </Grid>
      }

    </>
  )
}