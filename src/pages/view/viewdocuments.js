import {UnderlinedTabs} from '../../components/tabs'
import SectionTitle from '../../components/section-title'
import {
  Intro,
  Instructions,
  TemplateStructure
} from '../../components/viewannualdocs/installation'
import {
  CodeStructure,
  NamingConventions,
  Folders,
  Files
} from '../../components/viewannualdocs/code-structure'
import {Customization} from '../../components/viewannualdocs/faq'
import {Credits} from '../../components/viewannualdocs/credits'
import {ChangeLog} from '../../components/viewannualdocs/change-log'
import {Tree} from '../../components/viewannualdocs/tree'

const InstallationTab = () => (
  <div className="w-full">
    <Intro />
    <Instructions />
    <TemplateStructure />
  </div>
)

const CodeStructureTab = () => (
  <div className="w-full">
    <CodeStructure />
    <NamingConventions />
    <Folders />
    <Files />
    <Tree />
  </div>
)

const FaqTab = () => (
  <div className="w-full">
    <Customization />
  </div>
)

const CreditsTab = () => (
  <div className="w-full">
    <Credits />
  </div>
)

const ChangeLogTab = () => (
  <div className="w-full">
    <ChangeLog />
  </div>
)

const Index = () => {
  const tabs = [
    // {index: 0, title: '2017', content: <InstallationTab />},
    // {index: 1, title: '2018', content: <CodeStructureTab />},
    // {index: 2, title: '2019', content: <FaqTab />},
    // {index: 4, title: '2020', content: <CreditsTab />},
    {index: 0, title: '2021', content: <ChangeLogTab />}
  ]
  return (
    <>
      <SectionTitle title="" subtitle="View uploaded documents" />
      <div className="flex ">
        <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}
export default Index
