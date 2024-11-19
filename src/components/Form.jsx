import { useState, useEffect } from 'react';

export default function Form(){


    const [meme, setMeme] = useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
            
        }
    )
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        const request = async function () {
          try {
            const response = await fetch("https://api.imgflip.com/get_memes");
            if (!response.ok) {
              throw new Error(`Erro na resposta HTTP: ${response.status}`);
            }
            const json = await response.json();
            setAllMemes(json.data.memes);
          } catch (err) {
            console.error("Erro ao fazer a requisição: " + err.message);
          }
        };
        request();
      }, []);


    function handleNewImageClick(){
        const randomIndex = Math.floor(Math.random()* allMemes.length)
        const memeUrl = allMemes[randomIndex].url;
        setMeme(prevMeme => ({...prevMeme, randomImage: memeUrl}))
        // console.log(memeUrl);
    }
    
    function handleChange(event){
        const {name, value} = event.target

        setMeme( prevMeme => {
            return{
                ...prevMeme,
                [name]: value
            }
        })
    }



    return(
        <main>
            <div className='form'>
                <div className="input-container">
                    <div className="input-text">
                        <label type="text" className="poppins-medium">Top text</label>
                        <input
                            name="topText"
                            onChange={handleChange}
                            value={meme.topText} 
                            placeholder="Shut up" 
                        />    
                    </div>
                    <div className="input-text">
                        <label type="text" className="poppins-medium">Bottom text</label>
                        <input
                            name="bottomText"
                            onChange={handleChange}
                            value={meme.bottomText}  
                            placeholder="And take my money"
                        />
                    </div>
                </div>
                <button className="poppins-bold" onClick={handleNewImageClick} >Get a new meme image 🖼️</button>
            </div>
            <div className="meme">
                <img  className="meme--image" src={meme.randomImage} alt="" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}