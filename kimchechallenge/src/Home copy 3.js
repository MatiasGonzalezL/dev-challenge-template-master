import React, { cloneElement, useState } from "react";
import { DataQuery } from "./Queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";

export const Home = () => {
    const [busqueda, setBusqueda] = useState("");
    const [paises, setPaises] = useState(true);
    const [continentes,setContinentes] = useState(false);
    const [idiomas,setIdiomas] = useState(false);
    const [state, setState] = useState("");
    

    //traer datos con boton
    const { loading, data } = useQuery(DataQuery)

    if (loading) return "Cargando.......";
    if (data) {
        console.log(data)
    }

    
    //busqueda
    const buscador = (e) => {
        setBusqueda(e.target.value)
        console.log(e.target.value);
    }


    //filtrado
    let resultados = [];
    if (!busqueda) {
        resultados = data
    } else {
        resultados = data.languagesData.filter((dato) =>
            dato.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
        )
        console.log(resultados);
    };


    // const countryArray = data.continentsData;
    // const final2 = countryArray.forEach(element => {
    //     console.log("Claves y Objetos:", element);
    //     // if(element.name === "South America")  {
    //     //     console.log("Continent Code:", element.code);
    //     // } 
    //     element.countries.forEach(ele => {
    //         console.log("Paises de continente:", ele);
    //         const elem = Object.entries(ele);
    //         console.log("Convertidos a arreglos:", elem);
    //         // const elemMap = elem.map((e, index) => {
    //         //     return (
    //         //         <div key={index}>
    //         //             <h4>Nombre País: {e.name}</h4>;
    //         //         </div>
    //         //     );
    //         // })
    //     })
    // });
    // console.log("variable final2:", final2)


    const arr = [];

    const countryArray = data.continentsData;
    const final2 = countryArray.forEach(element => {
        element.countries.forEach(ele => {
            if(ele.continent.code === "EU") {
                Object.entries(arr.push({... ele}));
                
                //console.log("Este sí:", ele.emoji, ele.name, ele.currency);
            }})
           //console.log("Convertidos a arreglos:", ele);
        })
    ;
    console.log("variable Europa:", arr);


    return (
        <div className="div_principal">
            <div className="div_titulo">
                <h1>Country search</h1>
                <h5>Some random text</h5>
            </div>
            <div>
                <form className="input_general">
                    <span id="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                    </span>
                    <input
                        className="input_text"
                        type="text"
                        name="code"
                        placeholder="Escribe el país a buscar"
                        value={busqueda}
                        onChange={buscador}
                    />
                </form>
            </div>
            <div className="grupo">
                <h2>Group by:</h2>
                <button
                    type="button"
                    className="boton"
                    // onClick={() => getContinents()}
                    onClick={() => {setPaises(!paises); setContinentes(!continentes); setIdiomas(idiomas)}}
                >Continent
                </button>
                <button
                    type="button"
                    className="boton"
                onClick={() => {setPaises(!paises); setIdiomas(!idiomas); setContinentes(continentes)}}
                >Language
                </button>
            </div>
            <div>

                {continentes ?
                    <div className="container2">
                        {data.continentsData.map((continent, idx) => {
                            <h2>Continentes</h2>
                            return (
                                <>
                                    <h4 key={idx} className="titulo_pais">{continent.name}</h4>

                                    {/* Trayendo los datos hasta data.continentsData */}
                                    {/* {countryArray && <div>{countryArray.map((country, idx) => {
                                        return (
                                            <div className="card" key={idx}>
                                                <p>"hola mundo"</p>
                                                <h5>{country.name}</h5>
                                                <h5>{country.currency}</h5>
                                            </div>)
                                    })}</div>} */}

                                    {/* Traer los datos con forEach (para objetos) */}
                                    {countryArray && <div>{countryArray.forEach(element => {
                                        element.countries.forEach(ele => {
                                            if (ele.continent.code === "EU") {
                                                {console.log(ele)}
                                                return (
                                                    <div className="card" key={idx}>
                                                        <div className="container">
                                                            <h4>"Hola Mundo"</h4>
                                                            <h4 className="titulo_pais">{ele.emoji} - {ele.name}</h4>
                                                            <div className="div1">
                                                                <h6>Code: {ele.code}</h6>
                                                                <h6>Capital: {ele.capital}</h6>
                                                            </div>
                                                            {/* <div className="div2">
                                                                <h6>Language: {country.languages.map((language) => language.name)}</h6>
                                                                <h6>Language native: {country.languages.map((language) => language.native)}</h6>
                                                                <h6>Language code: {country.languages.map((language) => language.code)}</h6>
                                                            </div> */}
                                                            {/* <div className="div3">
                                                                <h6>Continent: {country.continent.name}</h6>
                                                                <h6>Continent code: {country.continent.code}</h6>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                )
                                            }})
                                        })
                                    }</div>}
                                </>
                            )
                        })}
                    </div>
                    :
                    <>
                        {idiomas ? <div className="container3">
                            {data.languagesData.map((language, idx) => {
                                return (
                                    <>
                                        <h4 className="titulo_pais">{language.name}</h4>
                                        <div className="card" key={idx}>
                                            <div className="container">
                                                <h4 className="titulo_pais">- Language name: {language.name}</h4>
                                                <h4 className="titulo_pais">- Language code: {language.code}</h4>
                                                <h4 className="titulo_pais">- Language native: {language.native}</h4>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                            :
                            <>
                                <div className="container1">
                                    {data.countriesData.map((country, idx) => {
                                        return (
                                            <div className="card" key={idx}>
                                                <div className="container">
                                                    <h4 className="titulo_pais">{country.emoji} {country.name}</h4>
                                                    <div className="div1">
                                                        <h6>Code: {country.code}</h6>
                                                        <h6>Capital: {country.capital}</h6>
                                                        <h6>Native: {country.native}</h6>
                                                    </div>
                                                    <div className="div2">
                                                        <h6>Language: {country.languages.map((language) => language.name)}</h6>
                                                        <h6>Language native: {country.languages.map((language) => language.native)}</h6>
                                                        <h6>Language code: {country.languages.map((language) => language.code)}</h6>
                                                    </div>
                                                    <div className="div3">
                                                        <h6>Continent: {country.continent.name}</h6>
                                                        <h6>Continent code: {country.continent.code}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </>}

            </div>
        </div>
    );
};