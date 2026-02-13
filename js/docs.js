/*
========================================
Documentation System Script
========================================
Features:

• Persistent dark/light mode
• Sidebar active link highlight
• Collapsible sidebar sections
• Terminal-style code titles
• Copy buttons for code blocks
• Safe initialization
========================================
*/


document.addEventListener("DOMContentLoaded", function ()
{
    initializeThemeToggle();

    initializeSidebar();

    initializeActiveLinks();

    initializeCopyButtons();

    initializeTerminalTitles();
});



/*
========================================
THEME TOGGLE
========================================
*/

function initializeThemeToggle()
{
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";

    updateThemeIcon(currentTheme);


    toggle.addEventListener("click", function ()
    {
        const theme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            theme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);

        localStorage.setItem("theme", newTheme);

        updateThemeIcon(newTheme);
    });
}



function updateThemeIcon(theme)
{
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}



/*
========================================
SIDEBAR COLLAPSIBLE
========================================
*/

function initializeSidebar()
{
    const titles = document.querySelectorAll(".collapsible");

    titles.forEach(title =>
    {
        title.addEventListener("click", function ()
        {
            this.parentElement.classList.toggle("open");
        });
    });
}



/*
========================================
ACTIVE PAGE HIGHLIGHT
========================================
*/

function initializeActiveLinks()
{
    const links = document.querySelectorAll(".nav-link");

    const currentPage =
        window.location.pathname.split("/").pop();

    links.forEach(link =>
    {
        const href = link.getAttribute("href");

        if (href === currentPage)
        {
            link.classList.add("active");

            const section =
                link.closest(".nav-section");

            if (section)
            {
                section.classList.add("open");
            }
        }
    });
}



/*
========================================
COPY BUTTONS
========================================
*/

function initializeCopyButtons()
{
    const blocks = document.querySelectorAll("pre");

    blocks.forEach(pre =>
    {
        if (pre.querySelector(".copy-button")) return;

        const code = pre.querySelector("code");

        if (!code) return;

        const button = document.createElement("button");

        button.className = "copy-button";

        button.textContent = "Copy";

        pre.appendChild(button);


        button.addEventListener("click", function ()
        {
            navigator.clipboard.writeText(code.innerText);

            button.textContent = "Copied!";

            button.classList.add("copied");

            setTimeout(() =>
            {
                button.textContent = "Copy";

                button.classList.remove("copied");

            }, 2000);
        });
    });
}



/*
========================================
TERMINAL TITLES
========================================
*/

function initializeTerminalTitles()
{
    const blocks = document.querySelectorAll("pre");

    blocks.forEach(pre =>
    {
        if (!pre.hasAttribute("data-title"))
        {
            pre.setAttribute(
                "data-title",
                "ubuntu@server: ~"
            );
        }
    });
}

initializeYouTubeCards();


initializeYouTubeCards();



/*
========================================
YouTube Cards with Full Automation
========================================
*/

const YOUTUBE_API_KEY = "AIzaSyB3X89T8QHr4AeDX-_zv5DuRGDY6karJmE";


async function initializeYouTubeCards()
{
    const cards =
        document.querySelectorAll(".video-card[data-youtube]");

    for (const card of cards)
    {
        const url = card.dataset.youtube;

        const videoId = extractYouTubeID(url);

        if (!videoId) continue;


        const apiUrl =
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${YOUTUBE_API_KEY}`;


        try
        {
            const response = await fetch(apiUrl);

            const data = await response.json();

            if (!data.items.length) continue;

            const video = data.items[0];

            const title =
                video.snippet.title;

            const channel =
                video.snippet.channelTitle;

            const duration =
                formatDuration(
                    video.contentDetails.duration
                );

            const thumbnail =
                `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;


            card.href = url;

            card.target = "_blank";


            card.innerHTML =
            `
            <div class="video-thumb-container">

                <img class="video-thumbnail"
                     src="${thumbnail}">

                <div class="video-duration">
                    ${duration}
                </div>

            </div>

            <div class="video-info">

                <div class="video-title">
                    ${title}
                </div>

                <div class="video-channel">
                    ${channel}
                </div>

            </div>
            `;
        }
        catch (e)
        {
            console.warn("YouTube API error", e);
        }
    }
}



/*
Extract YouTube ID
*/

function extractYouTubeID(url)
{
    const regExp =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);

    return match ? match[1] : null;
}



/*
Convert ISO duration to HH:MM:SS
*/

function formatDuration(iso)
{
    const match =
        iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    if (hours > 0)
    {
        return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${minutes}:${pad(seconds)}`;
}


function pad(num)
{
    return num.toString().padStart(2, "0");
}


