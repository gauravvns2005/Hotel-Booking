import React from 'react'
import './About.css'
import aboutImg from '../../assets/hero.jpg'

const About = () => {
  return (
    <div className='about-container'>
      <div className="about-header">
        <h2>About StayEase</h2>
      </div>

      {/* contents */}
      <div className="about-content">
        <div className="about-img">
            <img src={aboutImg} alt="image" />
        </div>
        <div className="about-text">
            <div className="about-heading">
                <h2>About</h2>
            </div>
            <div className="about-para">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium corporis itaque magni deserunt consequatur neque, quaerat veniam dolore, ea sint perferendis iure earum suscipit ipsum soluta porro maiores error a! Quae possimus, molestiae, sint laboriosam atque dolor iste adipisci laudantium, dolores error esse culpa! Fugit minima fuga numquam impedit dignissimos culpa quos, dicta similique debitis sed ducimus a. Porro dolor minima ab? Repudiandae adipisci repellendus quia, fugiat alias corporis dolor. Dignissimos unde ex alias fuga optio mollitia consectetur pariatur exercitationem blanditiis architecto repellendus saepe nesciunt suscipit, eaque praesentium eveniet fugiat cupiditate officia illo consequuntur. Hic atque tempora distinctio ea incidunt necessitatibus illum mollitia perferendis quos porro, ducimus quas at, iusto quo consequatur! Deserunt veritatis voluptate aperiam. Consequuntur blanditiis, quae maiores, dolorum possimus, voluptate a dolores tenetur quo laborum dignissimos quibusdam rem rerum aut? Laudantium repellat quibusdam amet perferendis, corrupti recusandae officia soluta asperiores nobis ex? Nostrum voluptates asperiores ea ipsam libero, ad nemo accusantium, repudiandae odio perferendis inventore nobis! Excepturi, sapiente? Praesentium magnam accusamus natus laboriosam expedita perspiciatis rem velit provident reiciendis in et, maxime atque fuga quasi quas, facilis quo facere labore fugiat beatae consequatur esse veritatis odit reprehenderit. Sint possimus impedit labore unde et beatae nobis consectetur ullam ipsum officia veritatis iste iusto, pariatur hic a corporis neque reiciendis eius dolore, earum dolor, voluptas voluptate cum ducimus. Minima asperiores consequatur nobis doloribus veritatis sint maxime! Magnam numquam libero porro laudantium quidem saepe aut perferendis earum quae est, et minima minus officia necessitatibus fugit ut nam? Doloremque quibusdam, minima repellendus facilis voluptas tempora necessitatibus quia illum corrupti ipsam consequuntur. Recusandae dolor asperiores quisquam fuga assumenda illum quam. Fugiat ipsum facere quod at. Consequuntur minus doloribus fugit et. Atque, nam dolore! Deserunt magni quis voluptatem qui deleniti eius cum fugit culpa, perspiciatis ipsum porro veritatis. Recusandae nostrum voluptatem perferendis eaque.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About
