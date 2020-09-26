import React, { useState, useEffect, useCallback } from 'react';
import classes from './Board.module.scss'

import cymbal1 from '../../assets/sounds/Cymbal-1.mp3';
import kick1 from '../../assets/sounds/Kick-1.mp3';
import snare from '../../assets/sounds/snare.mp3';
import tom1 from '../../assets/sounds/Tom-1.mp3';
import zap1 from '../../assets/sounds/Zap-1.mp3';
import bass1 from '../../assets/sounds/bass-1.mp3';
import clap from '../../assets/sounds/clap.mp3';
import hat from '../../assets/sounds/hat.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const boardItems = [
  {
    name: 'Cymbal',
    sound: cymbal1,
    color: '#8D91C7'
  },
  {
    name: 'Kick',
    sound: kick1,
    color: '#9CDE9F'
  },
  {
    name: 'Snare',
    sound: snare,
    color: '#D183C9'
  },
  {
    name: 'Tom',
    sound: tom1,
    color: '#145374'
  },
  {
    name: 'Zap',
    sound: zap1,
    color: '#EE6F57'
  },
  {
    name: 'Bass',
    sound: bass1,
    color: '#392F5A'
  },
  {
    name: 'Clap',
    sound: clap,
    color: '#9EB25D'
  },
  {
    name: 'Hat',
    sound: hat,
    color: '#90FCF9'
  }
];

const playTime = 400;
const maxCol = 14;
const colArr = [];
for (let i=0; i<maxCol; i++) colArr.push([]);

let interval = null;

const Board = () => {
  const [columns, setColumns] = useState(colArr);
  const [activeCol, setActiveCol] = useState(null);
  const [play, setPlay] = useState(false);
  const [loop, setLoop] = useState(false);

  const loopClass = loop ? classes.Active : null;

  const tagClicked = useCallback((row, col) => {
    setColumns(prevCols => {
      const newCols = [...prevCols];
      if (newCols[col].includes(row))
        newCols[col] = newCols[col].filter(r => r !== row);
      else
        newCols[col] = newCols[col].concat(row);
      return newCols;
    })
  }, []);

  const playSound = useCallback((src, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const audio = new Audio(src);
    audio.play();
  }, []);

  const resetBoard = useCallback(() => setColumns(colArr));

  useEffect(() => {
    if (interval) clearInterval(interval);

    if (play) {
      let track = 0;
      interval = setInterval(() => {
        columns[track].forEach(row => {
          playSound(boardItems[row].sound);
        });
        track++;

        if (track >= maxCol && loop) {
          track = 0;
        }
        else if (track >= maxCol) {
          clearInterval(interval);
          interval = null;
          setPlay(false);
        } 
      }, playTime);
    }
  }, [play, playSound, columns, loop]);

  return (
    <div className={classes.Board}>
      <div className={classes.Contents}>

        {boardItems.map((item, i) => {
          const style = {
            backgroundColor: item.color
          };

          return (
            <div key={i} className={classes.BoardRow}>
              <div className={classes.RowTag} style={style} onClick={e => playSound(item.sound, e)}>{item.name}</div>

              <div className={classes.Columns}>
                {columns.map((arr, j) => {
                  const colClasses = [classes.ColTag]
                  if (j === activeCol) colClasses.push(classes.Active);
                  let colStyle = {
                    backgroundColor: '#333',
                    boxShadow: 'inset 0px 0px 2px rgba(0, 0, 0, 0.8)'
                  }
                  if (arr.includes(i)) {
                    colStyle = style;
                  }
                  return <div key={i+'-'+j} 
                    className={colClasses.join(' ')} 
                    style={colStyle}
                    onClick={()=> tagClicked(i, j)}
                  >
                    { j === activeCol &&
                      <div className={classes.TagGlow}
                        style={{
                          backgroundColor: item.color,
                          boxShadow: '0 0 10px ' + item.color
                        }}
                      ></div>
                    }
                  </div>;
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes.Playback}>
        <button className={[classes.Btn, classes.Reset].join(' ')} onClick={resetBoard}>reset</button>
        <button className={[classes.Btn, classes.Play].join(' ')} onClick={()=> setPlay(p => !p)}>
          <FontAwesomeIcon icon={!play ? faPlay : faStop} color="inherit" fontSize="inherit" />
        </button>
        <button className={[classes.Btn, classes.Loop, loopClass].join(' ')} onClick={()=> setLoop(l => !l)}>loop</button>
      </div>
    </div>
  );
}

export default Board;
