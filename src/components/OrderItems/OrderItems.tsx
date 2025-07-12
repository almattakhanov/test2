import React, {useState} from 'react';
import {Order, OrderItem} from "@/app/globalRedux/model/order/order.type";
import NextImage  from "next/image";
import styles from "./OrderItems.module.scss";
import {formatPrice} from "@/src/utils/helpers";
import Link from "next/link";
import {statusTranslations} from "@/app/[locale]/account/[section]/orders/Orders";
import {Button, Input, Modal, Rate,  Image as AntImage,  Upload, UploadFile} from "antd";
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Add from '../../../public/icons/add.svg'
import {FreeMode, Pagination} from 'swiper/modules';
import {UploadChangeParam} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";

import './style.css';
import {useCreateProductReviewMutation} from "@/app/globalRedux/model/recommendation/recommendation.api";

type Props = {
    order: Order;
};

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const OrderItems = ({order}: Props) => {
    const showReviewButton = order?.status === 'created'
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [createReview, { isLoading }] = useCreateProductReviewMutation();

    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        setFileList(info.fileList);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const openModal = (productId: number) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!selectedProductId) return;

        try {
            const photosFiles = fileList
                .filter((f) => !!f.originFileObj)
                .map((f) => f.originFileObj as File);

            await createReview({
                user_short_name: order.user_name,
                product_id: selectedProductId,
                company_id: order.company_id,
                company_name: "default", // заменишь реальным значением если есть
                rating,
                review_text: reviewText,
                photos: photosFiles.length > 0 ? photosFiles : undefined,
            }).unwrap();



            // Успех
            setIsModalOpen(false);
            setReviewText('');
            setRating(0);
            setFileList([]);
            setSelectedProductId(null);
            console.log('Отзыв успешно отправлен!');
        } catch (e) {
            console.error('Ошибка при создании отзыва:', e);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const uploadButton = (
        <div style={{width: '90px', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/*<Add className={styles.addIcon}/>*/}
            <PlusOutlined
                style={{fontSize: 40, color: '#868696'}}/>
        </div>
    );

    return (
        <div className={styles.wrapper}>

            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                freeMode={true}

                pagination={false}
                modules={[FreeMode, Pagination]}
                className={styles.orderItemsSwiper}
            >
                {order?.order_items?.map((item) => {
                    const firstImageUrl = item.image_url?.split(",")[0] || "";
                    return (
                        <SwiperSlide key={item.id} className={styles.slide}>
                            <Link
                                className={styles.itemsWrapper}
                                href={`/product-page/${item.product_id}`}
                            >
                                <NextImage
                                    src={firstImageUrl}
                                    alt={item.name}
                                    width={180}
                                    height={220}
                                    className={styles.icon}
                                />
                                <p className={styles.price}>{formatPrice(item.unit_price)} c</p>
                                <p className={styles.name}>{item.name}</p>
                            </Link>

                            <Button
                                onClick={() => openModal(item.product_id)}
                                className={styles.reviewButton}
                                color="primary"
                                variant="solid"
                            >
                                Оставить отзыв
                            </Button>
                            <Button
                                className={styles.returnButton}
                                color="danger"
                                variant="outlined">
                                Возврат
                            </Button>
                        </SwiperSlide>

                    )
                })}
            </Swiper>


            <Modal
                open={isModalOpen}
                title={
                    <span style={{fontSize: 24, fontWeight: 700}}>
                        Написать отзыв
                    </span>
                }
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <div className={styles.modalContent}>
                    <Rate
                        value={rating}
                        onChange={setRating}
                        style={{fontSize: 32, marginBottom: 24, marginTop: 24}}
                    />
                    <p className={styles.label}>Отзыв</p>
                    <Input.TextArea
                        style={{
                            marginBottom: 24,
                        }}
                        rows={4}
                        placeholder="Введите"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className={styles.uploadWrap} style={{
                        marginBottom: 24
                    }}>
                        <Upload
                            beforeUpload={() => false}
                            //    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}

                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </div>

                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={!reviewText.trim() || isLoading}
                        loading={isLoading}
                        onClick={handleOk}
                    >
                        Отправить
                    </Button>
                </div>
            </Modal>

            <AntImage
                wrapperStyle={{ display: "none" }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
            />

        </div>
    );
};

export default OrderItems;