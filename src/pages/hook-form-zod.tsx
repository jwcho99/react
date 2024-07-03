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
            {errors.name?.message && <p>{errors.name.message.toString()}</p>}
            <input
                type='number'
                {...register('age', { valueAsNumber: true })}
            />
            {errors.age?.message && <p>{errors.age.message.toString()}</p>}
            <input type='submit' />
        </form>
    )
}

/*
div로 감싼 다음에 label 태그를 사용해서 input을 설명해주는 것이 좋다.
label 태그 안에 htmlFor 속성을 사용해서 input의 id와 연결해주면 input을 클릭했을 때 label이 선택된다.
그리고 input 태그 안에 id 속성을 사용해서 label과 연결해준다.
type속성과 placeholder 속성을 사용해서 input의 타입과 placeholder를 설정해준다.
input 태그에 {...register('name')}을 사용해서 name이라는 이름의 input을 등록해준다.
*/
