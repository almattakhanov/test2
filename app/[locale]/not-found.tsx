import {EmptyState} from "@/src/components/EmptyState/ui/EmptyState";


export default function NotFound() {
    return (
        <EmptyState
            title="Страница не найдена"
            imageSrc="/images/404-image.svg"
            actionText="Вернуться на главную"
            actionHref="/"
        />
    );
}
