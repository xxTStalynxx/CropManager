import moment from 'moment';
import { getCultivo } from '../../data_access/cultivos_dta';

export const getDate = () =>{
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const formatDate = (moment(date)).format('YYYY-MM-DD');
    return formatDate;
};

export const fechaEstimada = async (fecha: string, id_cult: string) =>{
    const cultivo = await getCultivo(id_cult);
    const fech = Date.parse(fecha) + cultivo?.dataValues.crecimiento * 3600000 * 24 + 3600000 * 12;
    const date = new Date(fech);
    const formatDate = (moment(date)).format('YYYY-MM-DD');
    return formatDate;
};