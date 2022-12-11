import { Card } from 'antd';
import {
    Session, 
    CardContent, 
    SessionInfo, 
    AddMaterialContainer 
} from './SessionCardStyle';
import { ActionContainer, ActionDropdown } from '../../../../styles/GlobalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPenToSquare, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import Material from '../Material';
import Button from '../../atoms/Button';
import { useState, useRef } from 'react';

const SessionCard = ({ session, index, initSession, dragStart, dragEnter, drop }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [nameValue, setNameValue] = useState(session.name)
    const [actionToggle, setActionToggle] = useState(false)
    const currentSession = JSON.parse(localStorage.getItem('session_collection'))
    const materialDragItem = useRef();
    const materialDragOverItem = useRef();

    const handleEditToggle = () => {
        setIsEdit(!isEdit);
    }

    const handleActionToggle = () => {
        setActionToggle(!actionToggle);
    }

    const deleteSession = () => {
        currentSession.splice(index, 1)
        localStorage.setItem('session_collection', JSON.stringify(currentSession))
        initSession()
    }

    const handleChangeName = (e) => {
        const newValue = e.target.value

        setNameValue(newValue)
        currentSession[index].name = newValue
        session.name = newValue

        localStorage.setItem('session_collection', JSON.stringify(currentSession))
    }

    const handleEditEnter = (event) => {
        if (event.key === 'Enter') {
            handleEditToggle()
        }
      };

    const addMaterial = () => {
        const newMaterial = [ ...currentSession[index].materials, { name: `Video Title ${Math.floor(Math.random() * 100)}`, created_at: new Date().toLocaleDateString() }]
        
        currentSession[index].materials = newMaterial
        session.materials = newMaterial

        localStorage.setItem('session_collection', JSON.stringify(currentSession))
        initSession()
    }

    const materialDragStart = (e, position) => {
        materialDragItem.current = position;
    };

    const materialDragEnter = (e, position) => {
        materialDragOverItem.current = position;
    };

    const materialDrop = (e) => {
        const copyListItems = [ ...currentSession[index].materials];
        const dragItemContent = copyListItems[materialDragItem.current];
        copyListItems.splice(materialDragItem.current, 1);
        copyListItems.splice(materialDragOverItem.current, 0, dragItemContent);
        materialDragItem.current = null;
        materialDragOverItem.current = null;

        currentSession[index].materials = copyListItems
        session.materials = copyListItems
        
        localStorage.setItem('session_collection', JSON.stringify(currentSession))
        initSession()
    };

    return(
        <Session 
            draggable 
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
        >
            <Card style={{ backgroundColor: '#fff', marginTop: '1rem', marginBottom: '1rem' }}>
                <CardContent>
                    <SessionInfo>
                        <FontAwesomeIcon icon={faGripVertical} style={{ marginRight: '12px', color: '#BCC0D0' }} />
                        {isEdit ? (
                            <input type="text" placeholder="Session name...." value={nameValue} onChange={handleChangeName} onKeyDown={handleEditEnter} />
                        ) : (
                            <p>{session.name}</p>
                        )}
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: '12px', color: '#BCC0D0', cursor: 'pointer' }}  onClick={handleEditToggle} />
                    </SessionInfo>
                    <ActionContainer>
                        <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: '12px', color: '#BCC0D0', cursor: 'pointer' }} onClick={handleActionToggle} />
                        {actionToggle ? (
                            <ActionDropdown>
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} onClick={deleteSession} />
                            </ActionDropdown>
                        ) : (
                            <></>
                        )}
                    </ActionContainer>
                </CardContent>
                <div>
                    {session.materials.map((material, materialIndex) => {
                        return (
                            <Material 
                                material={material} 
                                key={materialIndex} 
                                sessionIndex={index} 
                                materialIndex={materialIndex} 
                                initSession={initSession}
                                dragStart={materialDragStart}
                                dragEnter={materialDragEnter}
                                drop={materialDrop}
                            />
                        )
                    })}
                </div>
                <AddMaterialContainer>
                    <Button clickEvent={addMaterial}>
                        +
                    </Button>
                    <p style={{ marginLeft: '8px' }}>Add Lesson Material</p>
                </AddMaterialContainer>
            </Card>
        </Session>
    )
}

export default SessionCard;