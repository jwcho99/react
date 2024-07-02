import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
    name: z
        .string()
        .min(1, { message: '이름 필수입니다.' })
        .max(7, { message: '이름은 7글자 이하로 입력해주세요.' }),
    age: z.number().min(10, { message: '10살 미만은 가입할 수 없어요.' }),
})
type SchemaType = z.infer<typeof schema>

export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <form onSubmit={handleSubmit((d) => console.log(d))}>
            <input {...register('name')} />
            {errors.name?.message && <p>{errors.name?.message.toString()}</p>}
            <input
                type='number'
                {...register('age', { valueAsNumber: true })}
            />
            {errors.age?.message && <p>{errors.age?.message.toString()}</p>}
            <input type='submit' />
        </form>
    )
}
