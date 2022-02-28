import * as React from 'react';
import { Teams } from 'api';

import { TeamsDropdown, NavBar } from 'components/common';

import TeamOverview from './components/TeamOverview';
import TeamRoster from './components/TeamRoster';
import TeamLeaders from './components/TeamLeaders';

const TeamsPage = () => {
    const isFirstRender = React.useRef(true);
    const [allTeams, setAllTeams] = React.useState();
    const [teamOptions, setTeamOptions] = React.useState();
    const [selectedTeam, setSelectedTeam] = React.useState(null);
    const [singleTeam, setSingleTeam] = React.useState();
    const [teamLeaders, setTeamLeaders] = React.useState();

    React.useEffect(() => {
        if (isFirstRender.current) {
            (async () => {
                const teams = await Teams.getTeams();
                let newList = [];
                for (let i = 0; i < teams.length; i++) {
                    newList.push({
                        key: teams[i].id,
                        value: i,
                        text: `${teams[i].team_name} ${teams[i].nickname}`,
                    });
                }
                setTeamOptions(newList);
                setAllTeams(teams);
            })();
            isFirstRender.current = false;
            return;
        }
    }, []);

    const handleChange = (_, { value }) => {
        setSelectedTeam(value);
        getTeam(value);
    };

    const getTeam = async (idx) => {
        const team = await Teams.getSingleTeam(allTeams[idx].id);
        const leaders = await Teams.getSingleTeamLeaders(allTeams[idx].id);
        setTeamLeaders(leaders);
        setSingleTeam(team);
    };

    return (
        <div>
            <NavBar />

            <TeamsDropdown
                options={teamOptions}
                setSelection={handleChange}
                selection={selectedTeam}
            />
            <div className='page-container'>
                {singleTeam && (
                    <div>
                        <TeamOverview
                            simplifiedTeam={allTeams[selectedTeam]}
                            overview={singleTeam.team_details}
                            overallStats={singleTeam.team_stats}
                        />

                        <TeamLeaders leaders={teamLeaders} />

                        <TeamRoster roster={singleTeam.team_roster} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamsPage;
