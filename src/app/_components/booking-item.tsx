import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {Card, CardContent} from './ui/card'


interface BookingItemProps{
    booking: Prisma.BookingGetPayload<{
        include:{
            service:true;
            barbershop:true;
        }
    }>;

}

const BookingItem = ({booking}:BookingItemProps) => {
    return ( 
        <Card>
            <CardContent className='p-5 py-0 flex flex-row justify-between flex-[0.8]'>
                <div className='py-5 flex flex-col gap-3'>
                    <Badge className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>Confirmado</Badge>
                    <h2 className='font-bold'>Corte de Cabelo</h2>
                    <div className='flex items-center gap-2'>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl}/>
                            <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-5 flex-[0.2]">
                    <p className='text-sm capitalize'>{format(booking.date, "MMMM", {locale:ptBR})}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh':'mm")}</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem; 