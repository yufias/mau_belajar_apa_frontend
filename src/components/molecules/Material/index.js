import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faVideo, faClock, faCircle, faDownload, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MaterialSection, MaterialDetail, MaterialMeta } from './MaterialStyle';
import { ActionContainer, ActionDropdown } from '../../../../styles/GlobalStyles';
import { useState } from 'react';

const Material = ({ material, sessionIndex, materialIndex, initSession, dragStart, dragEnter, drop }) => {
    const [actionToggle, setActionToggle] = useState(false)
    const currentSession = JSON.parse(localStorage.getItem('session_collection'))

    const handleActionToggle = () => {
        setActionToggle(!actionToggle);
    }

    const deleteMaterial = () => {
        currentSession[sessionIndex].materials.splice(materialIndex, 1)
        localStorage.setItem('session_collection', JSON.stringify(currentSession))
        initSession()
    }

    return (
        <MaterialSection
            draggable 
            onDragStart={(e) => dragStart(e, materialIndex)}
            onDragEnter={(e) => dragEnter(e, materialIndex)}
            onDragEnd={drop}
        >
            <MaterialDetail>
                <FontAwesomeIcon icon={faGripVertical} style={{ marginLeft: '12px', marginRight: '12px', color: '#BCC0D0', cursor: 'pointer' }} />
                <FontAwesomeIcon icon={faVideo} style={{ marginRight: '12px', color: '#BCC0D0', cursor: 'pointer' }} />
                <p>{material.name}</p>
            </MaterialDetail>
            <MaterialMeta>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '12px', color: '#BCC0D0' }} />
                <p>{material.created_at}</p>
                <FontAwesomeIcon icon={faCircle} style={{ marginLeft: '12px', marginRight: '12px', color: '#BCC0D0', fontSize: '6px' }} />
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '12px', color: '#BCC0D0' }} />
                <p>06:30 Min</p>
                <FontAwesomeIcon icon={faCircle} style={{ marginLeft: '12px', marginRight: '12px', color: '#BCC0D0', fontSize: '6px' }} />
                <FontAwesomeIcon icon={faDownload} style={{ marginRight: '12px', color: '#BCC0D0' }} />
                <p>Downloadable</p>

                {/* <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: '12px', color: '#BCC0D0', cursor: 'pointer' }} /> */}
                <ActionContainer>
                        <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: '12px', color: '#BCC0D0', cursor: 'pointer' }} onClick={handleActionToggle} />
                        {actionToggle ? (
                            <ActionDropdown>
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} onClick={deleteMaterial} />
                            </ActionDropdown>
                        ) : (
                            <></>
                        )}
                    </ActionContainer>
            </MaterialMeta>
        </MaterialSection>
    )
}

export default Material;