import './CardCourseStatistics.scss'
import '../../pages/Statistics/Statistics.scss'
const CardCourseStatistics = ({title, image, author, bought, trial, lessons, mentors, gpa, points, best_points, best_gpa}:any) => {
    let checkGPA = () => {
        if (gpa > 3){
            return 'green'
        } else if (gpa > 2){
            return 'yellow'
        }
        else{
            return 'red'
        }
    }

    let checkPoints = () => {
        if (points >= 60){
            return 'green'
        } else if (points >= 40){
            return 'yellow'
        }
        else{
            return 'red'
        }
    }

    return (
        <div className='cardCourseStatistics'>
            <div className="imgCard">
                <img src={image} alt="Img"/>
            </div>
            <div className="bodyCard">
                <h2>{title}</h2>
                <p>Автор: {author}</p>
                <p>Количество уроков: {lessons}</p>
                <p>Купили: {bought}</p>
                <p>Триал: {trial}</p>
                <p>Менторов: {mentors}</p>
                <p>Рекордный балл: {best_points}</p>
                <p>Рекордный GPA: {best_gpa}</p>
                <p>Средний GPA: <span className={checkGPA()}>{gpa}</span> </p>
                <p>Средний балл: <span className={checkPoints()}>{points}</span> </p>
            </div>
        </div>
    )
}

export default CardCourseStatistics