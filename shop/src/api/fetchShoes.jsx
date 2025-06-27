import axios from 'axios';

const DATA_URL = 'https://dodni-dode.github.io/ReactPages/shop/data.json';

// 전체 신발 데이터 GET
export const fetchShoes = () => axios.get(DATA_URL).then(res => res.data);
