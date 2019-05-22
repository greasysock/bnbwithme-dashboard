const people = [
    'Dwight Schrute',
    'Jim Halpert',
    'Pam Beesly',
    'Stanley Hudson',
    'Kevin Malone',
    'Angela Martin',
    'Phyllis Vance',
    'Meredith Palmer',
    'Creed Bratton',
    'Oscar Martinez',
    'Ryan Howard',
    'Kelly Kapoor',
    'Andy Bernard',
    'Toby Flenderson',
    'Michael Scott',
    'Darryl Philbin',
    'Erin Hannon'
]

export const randomPerson = () => {
    const select = Math.floor(((people.length-1) * Math.random()))
    return people[select]
}