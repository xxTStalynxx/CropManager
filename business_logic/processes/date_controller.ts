import moment from 'moment';

export const getDate = () =>{
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const formatDate = (moment(date)).format('DD-MM-YYYY');
    return formatDate;
};