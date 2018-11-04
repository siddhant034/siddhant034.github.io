(function IIFE() {
    var media1 = window.matchMedia("(min-width: 1024px)");
    var media2 = window.matchMedia("(min-width: 500px) and (max-width: 1023px)");
    var wrapper = document.getElementById('wrapper');
    let projects = [
        {
            title: 'Personal Website',
            imgSrc: 'assets/personalWebsite.png',
            href: 'https://siddhant034.github.io/'
        },
        {
            title: 'Reddit Top 10',
            imgSrc: 'assets/redditTop10.png',
            href: 'https://siddhant034.github.io/Projects/RedditTop10'
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        },
        {
            title: 'Coming soon',
            imgSrc: '',
            href: ''
        }
    ];
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        // create outer div for project
        let projectDiv = document.createElement('div');
        if (project.imgSrc) {
            projectDiv.style.backgroundImage = 'url(' + project.imgSrc + ')';
        }
        else {
            projectDiv.style.backgroundColor = 'black';
        }
        projectDiv.className = 'project-containers';
        if (project.href) {
            projectDiv.addEventListener('click', () => {
                window.open(project.href);
            });
        }

        // handle single project in a row
        if (projects.length % 2 == 0 && i == projects.length - 1 && media1.matches) {
            projectDiv.style.marginLeft = '28%';
            projectDiv.style.marginRight = '28%';
        }
        else if (projects.length % 2 == 1 && i == projects.length - 1 && media2.matches) {
            projectDiv.style.marginLeft = '27%';
            projectDiv.style.marginRight = '27%';
        }

        // create overlayDiv
        let overlayDiv = document.createElement('div');
        overlayDiv.className = 'overlay-div';

        // create p element for title
        let title = document.createElement('p');
        title.innerText = project.title;

        overlayDiv.appendChild(title);
        projectDiv.appendChild(overlayDiv);
        wrapper.appendChild(projectDiv);
    }
}())
