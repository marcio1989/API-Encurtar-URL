import React, { useEffect } from 'react';
import useShortUrl from '../../hooks/useShortUrl';

const Redirect: React.FC = (props: any) => {
  const { getUrlByCode, url } = useShortUrl();

  useEffect(()=>{
    const { code } = props?.match?.params;
    console.log(code);
    getUrlByCode(code);
  },[]);

  useEffect(()=>{
    if(url){
      window.location.href = url;
    }
  },[url]);

  return <></>;
}

export default Redirect;
