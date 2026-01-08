

export default function Home(){

    return <>
        <div className="stacked">
            <h1>Home Page</h1>
            <div className="sideBySide">
                <button style={{flex:1}}>Pilsētas</button>
                <button style={{flex:1}}>Novadi</button>
            </div>
            <div className="sideBySide">
                <button style={{flex:1}}>Rezultāti</button>
            </div>
        </div>
    </>
    

}