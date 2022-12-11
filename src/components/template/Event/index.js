import HeaderSection from "../../molecules/HeaderSection";
import { Template } from "./EventStyle";
import { Tabs, Card } from 'antd';
import Button from "../../atoms/Button";
import SessionCard from "../../molecules/SessionCard";
import { useState, useEffect, useRef } from "react";

const Event = () => {
    const [sessionList, setSessionList] = useState([])
    const dragItem = useRef();
    const dragOverItem = useRef();

    const initSession = () => {
        setSessionList(JSON.parse(localStorage.getItem('session_collection')))
    }

    const addSession = () => {
        const newSessionList = [...sessionList, {name: 'New session', materials: []}]
        localStorage.setItem('session_collection', JSON.stringify(newSessionList))
        setSessionList(newSessionList)
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...sessionList];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        
        localStorage.setItem('session_collection', JSON.stringify(copyListItems))
        setSessionList(copyListItems);
    };

    useEffect(() => {
        initSession()
    }, [])


    return (
        <Template>
            <HeaderSection />
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: `Curricullum`,
                        key: '1'
                    }
                ]}
            />
            <Card style={{ backgroundColor: '#fff', marginTop: '1rem', marginBottom: '1rem', fontSize: '16px' }}>
                <p>Event Schedule: 24 Oktober 2021, 16:30</p>
            </Card>
            {sessionList.map((session, index) => {
                return (
                    <SessionCard 
                        session={session} 
                        key={index} 
                        index={index} 
                        initSession={initSession} 
                        dragStart={dragStart}
                        dragEnter={dragEnter}
                        drop={drop}
                    />
                )
            })}
            <Button clickEvent={addSession}>
                + Add Session
            </Button>
        </Template>
    )
}

export default Event;