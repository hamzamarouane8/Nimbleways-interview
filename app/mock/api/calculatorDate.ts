import mock from "../mock";
import data from "../../../mockoon.json"

const getDateStart= new Date();

mock.onGet('api/date').reply((config)=>{
    return [200,data.data[0].item.routes[0].responses[0].body]
})