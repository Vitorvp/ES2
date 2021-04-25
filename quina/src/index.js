import React from 'react'
import ReactDOM from 'react-dom'
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

class Tabuleiro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(38).fill(null),
            p1IsNext: true,
        };
    }

    colocarPedra(i) {
        const quadrados = this.state.quadrados.slice();
        quadrados[i] = this.state.p1IsNext ? '🟢' : '🔵'
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
            <div className="jogo">
                <div className="jogo-tabuleiro">
                    <Tabuleiro />
                </div>
            </div>
        );
    }
}

// ==============================================================================

ReactDOM.render(
    <Jogo />,
    document.getElementById('root')
);