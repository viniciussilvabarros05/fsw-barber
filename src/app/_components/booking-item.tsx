import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {Card, CardContent} from './ui/card'
const BookingItem = () => {
    return ( 
        <Card>
            <CardContent className='p-0 px-5 flex flex-row justify-between flex-[0.8]'>
                <div className='py-5 flex flex-col gap-3'>
                    <Badge className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>Confirmado</Badge>
                    <h2 className='font-bold'>Corte de Cabelo</h2>
                    <div className='flex items-center gap-2'>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://images.pexels.com/photos/3979134/pexels-photo-3979134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">Vintage Barber</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-5 flex-[0.2]">
                    <p>Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p>09:45</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem; 