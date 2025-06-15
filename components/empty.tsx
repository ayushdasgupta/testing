import Image from "next/image";

interface EmptyProps{
    label: string;
}

export const Empty = ({
    label
}: EmptyProps) =>{
    return(
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-[258px] w-[150px] ">
                <Image
                    alt="Empty"
                    fill
                    src="/empty.png"
                />
            </div>
            <p className="text-muted-foreground text-sn text center py-2">
                {label}
            </p>
        </div>
    );
}