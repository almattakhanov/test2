import React, {useState} from 'react'
import styles from './Feedback.module.scss'
import {Avatar, Image, Rate, Space} from 'antd'
import {UserOutlined} from '@ant-design/icons'

interface Props {
    username: string
    date: string
    rating: number
    previewText: React.ReactNode
    fullText: React.ReactNode
    images: string[]
}

export const Feedback: React.FC<Props> = (
    {
        username,
        date,
        rating,
        previewText,
        fullText,
        images,
    }
) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <Space align="center" size={24}>
                        <Avatar size={64} icon={<UserOutlined/>}/>
                        <div className={styles.userDetails}>
                            <Rate allowHalf defaultValue={rating}/>
                            <Space size={12} align="center" className={styles.userMeta}>
                                <p>{username}</p>
                                <span>•</span>
                                <span>{date}</span>
                            </Space>
                        </div>
                    </Space>
                </header>

                <section className={styles.body}>
                    {expanded ? <div>{fullText}</div> : <div>{previewText}</div>}

                    <a className={styles.readMore}
                       onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Свернуть' : 'Читать полностью'}
                    </a>
                </section>

                <section className={styles.photos}>
                    <Image.PreviewGroup>
                        {images.map((src, i) => (
                            <Image
                                key={i}
                                src={src}
                                alt="commodity"
                                width={74}
                                height={90}
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: 12,
                                    background: '#f7f7f7',
                                    padding: '10px 8px',
                                }}
                            />
                        ))}
                    </Image.PreviewGroup>
                </section>
            </div>
        </div>
    )
}
