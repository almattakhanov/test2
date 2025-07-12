import React from 'react';
import { Modal } from 'antd';
import {StoreInformation} from "@/src/components/StoreInformation/ui/StoreInformation";
import {Offer, ProductData} from "@/app/globalRedux/model/product/product.type";

type SupplierOffersModalProps = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    offers: Offer[];
    product: ProductData;
    setIsModalOpen: (isOpen: boolean) => void;
};

const SupplierOffersModal = ({ isModalOpen, handleOk, handleCancel, offers, product, setIsModalOpen }: SupplierOffersModalProps) => {
    return (
        <Modal
            width='328px'
            footer={null}
            title="Предложения от поставщиков"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            closable
        >
           <StoreInformation
               product={product}
               offers={offers || []}
               setIsModalOpenAction={setIsModalOpen}
               module={true}/>
        </Modal>
    );
};

export default SupplierOffersModal;
