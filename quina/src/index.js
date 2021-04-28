import React from 'react'
import ReactDOM from 'react-dom'
import titulo from './img/titulo.png'
import vs from './img/vs.png'
import avatar_f from './img/avatar-feminino.png'
import avatar_pc from './img/avatar_pc.png'
import './index.css'

function Quadrado(props) {
    return(
        <button
            className="quadrado"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function pedra_v(){
    return(
        <div className="pedra_vermelha">
        </div>
    );
}

function pedra_a(){
    return(
        <div className="pedra_amarela">
        </div>
    );
}

class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(19**2).fill(null),
            p1IsNext: true,
        };
    }

    colocarPedra(i) {
        const quadrados = this.state.quadrados.slice();
        const centro = parseInt(quadrados.length/2)
        if (quadrados[i]) {
            return;
        }
        if (!quadrados[centro]) {
            quadrados[centro] = this.state.p1IsNext ? pedra_v() : pedra_a()
        } else {
            quadrados[i] = this.state.p1IsNext ? pedra_v() : pedra_a()
        }
        this.setState({
            quadrados: quadrados,
            p1IsNext: !this.state.p1IsNext,
        });
    }

    renderTabuleiro(n) {
        const tabuleiro = []
        for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++){
                tabuleiro.push(<Quadrado
                                    value={this.state.quadrados[(n*i)+j]}
                                    onClick={() => this.colocarPedra((n*i)+j)}
                                />);
             }
             tabuleiro.push(<div> </div>);
        }

        return (
           <div className="tabuleiro">
                {tabuleiro}
           </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderTabuleiro(19)}
            </div>
        );
    }
}

class Jogo extends React.Component {
    render() {
        return(
            <div className="jogo" style={{marginTop: 15}}>
                <div className="jogo-tabuleiro">
                    <Tabuleiro />
                </div>
            </div>
        );
    }
}

class Interface extends React.Component {
    render() {
        return(
            <div className="background_effect">
                <img src={titulo} className="position-logo" alt="titulo" />
                <div id="corpo">
                    <nav id="menu"></nav>
                    <section id="fundo_area_jogo">
                        <article className="area_jogo">
                                <div className="ctnFlex">
                                    <div className="cabecalho_artigo" style={{marginLeft: 30}}>
                                        <div className="fundo_avatar" style={{marginTop: -5, marginLeft: -5}}>
                                            <div className="circle" style={{float: "left"}}>
                                                <img src={avatar_f} alt="avatar_f"/>
                                            </div>
                                        </div>
                                    </div>
                                    <img src={vs} alt="vs" style={{width: '8%', height: '8%', marginTop: "auto"}}/>
                                    <div className="cabecalho_artigo" style={{marginRight: 30}}>
                                        <div className="fundo_avatar" style={{float: "right", marginTop: -5, marginRight: -5}}>
                                            <div className="circle" style={{float: "right"}}>
                                                <img src={avatar_pc} alt="avatar_pc"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Jogo />
                                </div>
                        </article>
                    </section>
                </div>
            </div>
        );
    }
}

// ==============================================================================

ReactDOM.render(
    <Interface />,
    document.getElementById('root')
);