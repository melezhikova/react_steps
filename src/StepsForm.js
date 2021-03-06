import { useState } from "react";
import OneDay from "./OneDay";

function StepsForm () {
    const [form, setForm] = useState ({
        date: '',
        distance: ''
    });
    const [dataList, setList] = useState([
        {id: '1613847600000', date: '21.01.2021', distance: '3.8'},
        {id: '1624579200000', date: '25.05.2021', distance: '5.7'},
        {id: '1642723200000', date: '21.12.2021', distance: '1.8'}
    ]);

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.value;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    function dateValue (data) {
        const year = data.substring(6,10);
        const month = data.substring(3,5);
        const day = data.substring(0,2);
        const id = new Date(year, month, day).valueOf();
        return `${id}`;
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        const newData = {
            id: dateValue (form.date),
            date: form.date,
            distance: form.distance
        }
        if (isNaN(newData.id)) {
            console.log('id некорректен');
            return;
        }
        const index = dataList.findIndex((item) => item.id === newData.id);
        setList(prevList => {
            if (index === -1) {
                prevList.push(newData);
                prevList
                    .sort((a, b) => {return a.id - b.id})
                    .reverse();
            } else {
                prevList[index].distance = String(prevList[index].distance * 1 + newData.distance * 1)
            }
            return [...prevList];
        })

        setForm({date: '', distance: ''});  
    }

    const clickToDelete = (evt) => {
        const index = dataList.findIndex((item) => item.id === evt.target.dataset.id);
        if (index === -1) {
            console.log('Что-то пошло не так')
            return;
        } 
        setList(prevList => {
            prevList.splice(index, 1);
            return [...prevList];
        })
    }

    return (
        <div className="box">
            <form onSubmit={handleSubmit}>
                <div className="formBox">
                    <div className="inputBox">
                        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                        <input id="date" name="date" onChange={handleChange} value={form.date} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="distance">Пройдено км</label>
                        <input id="distance" name="distance" onChange={handleChange} value={form.distance} />
                    </div>
                    <button className="btn" type="submit">Ok</button>
                </div>
            </form>
            <div className="headings">
                <div className="heading">Дата (ДД.ММ.ГГ)</div>
                <div className="heading">Пройдено км</div>
                <div className="heading">Действия</div>
            </div>
            <div className="table">
                {dataList.map(
                    o => <OneDay key={o.id} item={o} delDay={clickToDelete} />
                )}
            </div>
        </div>
    )
}

export default StepsForm;