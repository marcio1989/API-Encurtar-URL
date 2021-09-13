import { useCallback, useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import { ENUM_ROUTES } from '../routes';

interface IURL {
    _id: string;
    code: string;
    original: string;
    createdAt: string;
}
const useShortUrl = () => {
    const history = useHistory();
    const [url, setUrl] = useState<string>('');
    const [urls, setUrls] = useState<IURL[]>([]);
    const [errUrl, setErrUrl] = useState<string>('');
    const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);

    const getMyUrls = useCallback(async () => {
        setIsLoadingResponse(true);
        try {
            const response = await api.get('/short-url');
            setUrls(response.data);
        }
        catch (err: any) {
            if (err?.response?.status === 500) {
                setErrUrl('Falha ao encurtar url, por favor, tente novamente mais tarde');
            }
            else {
                setErrUrl('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }
        }
        setIsLoadingResponse(false);
    }, []);

    const getUrl = useCallback(async (originalUrl: string) => {
        setErrUrl('');
        setIsLoadingResponse(true);
        try {
            const response = await api.post('/short-url', {
                url: originalUrl
            });
            setUrl(response.data);
        }
        catch (err: any) {
            if (err?.response?.status === 400) {
                setErrUrl(err?.response?.data.message[0]);
            }
            else if (err?.response?.status === 500) {
                setErrUrl('Falha ao encurtar url, por favor, tente novamente mais tarde');
            }
            else {
                setErrUrl('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }
        }
        setIsLoadingResponse(false);
    }, []);

    const getUrlByCode = useCallback(async (code: string) => {
        setErrUrl('');
        setIsLoadingResponse(true);
        try {
            const response = await api.get(`/short-url/${code}`);
            if(!response.data){
                history.push(ENUM_ROUTES.Home)
            }
            setUrl(response.data.original);
        }
        catch (err: any) {
            if (err?.response?.status === 500) {
                setErrUrl('Falha ao encurtar url, por favor, tente novamente mais tarde');
            }
            else {
                setErrUrl('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }
        }
        setIsLoadingResponse(false);
    }, [history]);

    const clearUrl = useCallback(() => {
        setUrl('');
        setErrUrl('');
    }, [])

    return { url, errUrl, urls, isLoadingResponse, getUrl, clearUrl, getMyUrls, getUrlByCode }
}
export default useShortUrl;