$(function(){
    $('.change_intro').submit((e)=>{
        e.preventDefault()

        let $form = $(this),
        new_intro = $form.find("input[name='about_me']").val()
        

        let posting = $.post('/change_profile', {about_me: new_intro})
        console.log(new_intro)
        posting.done((user)=>{
            $('.about-me').html(user.other.about_me);
            $form.hide()
        })

    })
    $('.add-skill').submit((e)=>{
        e.preventDefault()

        let $form = $(this),
        new_skill = $form.find("input[name='skill']").val()


        let posting = $.post('/change_profile', {skill: new_skill})
        posting.done((user)=>{
           
            $('.skill').empty()
            user.other.skill.forEach(sk => {
                $('.skill').append('<p>'+sk+'</p>');
            });
        })
    })

    $('.add-project').submit(e=>{
        e.preventDefault()

        let $form = $(this),
        new_pr = $form.find("input[name='project']").val()


        let posting = $.post('/change_profile', {project: new_pr})

        posting.done((user)=>{

            $('.projects').empty()
            user.other.completed_projects.forEach(pr=>{
                $('.projects').append('<p>'+pr+'</p>')
            })
        })
    })
})