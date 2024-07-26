import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function Header(props) {
    return (
        <header>
            <h1><a href="/" onClick={(event) => {
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    )
}

function Nav(props) {
    const lis = []

    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(<li key={t.id}>
            <a href={'/read/' + t.id} id={t.id} onClick={event => {
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
            }}>{t.title}</a>
        </li>);
    }
    return (
        <nav>
            <ol>
                {lis}
            </ol>
        </nav>
    )
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    )
}

function Create(props) {

    return (
        <article>
            <h2>Create</h2>
            <form onSubmit={event => {
                event.preventDefault();
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onCreate(title, body);
            }}>
                <p><input type="text" name="title" placeholder="title"/></p>
                <p><textarea name="body" placeholder="body"/></p>
                <p><input type="submit" value="제출"/></p>
            </form>
        </article>
    )
}

function Update(props) {
    return (
        <article>
            <h2>UPDATE</h2>
            <form onSubmit={event => {
                event.preventDefault();
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onUpdate(title, body);
            }}>
                <p><input type="text" name="title" placeholder="title" value={props.title}/></p>
                <p><textarea name="body" placeholder="body" value={props.body}/></p>
                <p><input type="submit" value="Update"/></p>
            </form>
        </article>
    )
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [topics, setTopics] = useState([
        {id: 1, title: 'html', body: 'html is ...'},
        {id: 2, title: 'css', body: 'css is ...'},
        {id: 3, title: 'js', body: 'js is ...'}
    ]);
    const [nextId, setNextId] = useState(4);

    let content = null;
    let contextControl = null;

    if (mode === 'WELCOME') {
        content = <Article title="Welcome" body="Hello, Web"/>
    } else if (mode === 'READ') {
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}/>
        contextControl = <li><a href={"/update/" + id} onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
        }}>Update</a></li>
    } else if (mode === 'CREATE') {
        content = <Create onCreate={(title, body) => {
            const newTopic = {id: nextId, title: title, body: body}
            const newTopics = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode('READ');
            setId(nextId);
            setNextId(nextId + 1);
        }}/>
    } else if (mode === 'UPDATE') {
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }

        content = <Update title={title} body={body} onUpdate={(title, body) => {

        }}/>
    }

    return (
        <div>
            <Header title="React" onChangeMode={() => {
                setMode('WELCOME');
            }}/>
            <hr/>
            <Nav topics={topics} onChangeMode={(_id) => {
                setMode('READ');
                setId(_id);
            }}/>
            <hr/>
            {content}
            <hr/>
            <ul>
                <li><a href="/create" onClick={event => {
                    event.preventDefault();
                    setMode('CREATE');
                }}>Create</a></li>
                {contextControl}
            </ul>
        </div>
    );
}

export default App;
